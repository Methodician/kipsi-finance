import firebase from "firebase/app";
import "firebase/firestore";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from "rxjs/operators";
import { Subject } from "rxjs";
import {
  ProjectCreate,
  ProjectUpdate,
  Project,
  DbProject,
} from "../models/project.models";

export class ProjectService {
  private static instance: ProjectService;
  private db: firebase.firestore.Firestore;

  private constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  public static getInstance(db: firebase.firestore.Firestore): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService(db);
    }
    return ProjectService.instance;
  }

  createProject = (project: ProjectCreate) => {
    const id = this.db.collection("projects").doc().id;
    const newProject = {
      ...project,
      id,
      expenseIds: [],
    };

    return this.db.collection("projects").doc(id).set(newProject);
  };

  updateProject = (project: ProjectUpdate) => {
    return this.db.doc(`projects/${project.id}`).update(project);
  };

  deleteProject = (id: string) => {
    return this.db.doc(`projects/${id}`).delete();
  };

  projectById$ = (id: string) => {
    const _project$ = new Subject<Project>();
    const _finish$ = new Subject<void>();

    this.db
      .collection("projects")
      .doc(id)
      .onSnapshot((doc) => {
        const dbProject = doc.data() as DbProject | undefined;
        if (dbProject) {
          const project = {
            ...dbProject,
            startDate: dbProject.startDate.toDate(),
            endDate: dbProject.endDate.toDate(),
          };
          _project$.next(project as Project);
        }
      });

    const cleanup = () => {
      _finish$.next();
      _finish$.complete();
    };

    const project$ = _project$.pipe(
      takeUntil(_finish$),
      catchError((err, caught) => {
        console.error(err);
        return caught;
      })
    );

    return { project$, cleanup };
  };

  allProjects$ = () => {
    const _projects$ = new Subject<Project[]>();
    const _finish$ = new Subject<void>();

    this.db.collection("projects").onSnapshot((snapshot) => {
      const projects = snapshot.docs
        .map((doc) => doc.data() as DbProject)
        .map((project) => ({
          ...project,
          startDate: project.startDate.toDate(),
          endDate: project.endDate.toDate(),
        }));
      _projects$.next(projects);
    });

    const cleanup = () => {
      _finish$.next();
      _finish$.complete();
    };

    const projects$ = _projects$.pipe(
      takeUntil(_finish$),
      startWith([]),
      map((projects) =>
        projects.map((project) => ({
          ...project,
          startDate: project.startDate,
          endDate: project.endDate,
        }))
      ),
      catchError((err, caught) => {
        console.error(err);
        return caught;
      })
    );

    return { projects$, cleanup };
  };

  filteredProjects$ = (filter: string) => {
    const { projects$, cleanup } = this.allProjects$();
    const filteredProjects$ = projects$.pipe(
      debounceTime(300), // minor performance optimization but does not matter unless we use observables for the query
      map((projects) => {
        return projects.filter(
          (project) =>
            project.name.toLowerCase().includes(filter.toLowerCase()) ||
            project.description.toLowerCase().includes(filter.toLowerCase())
        );
      }),
      distinctUntilChanged() // minor performance optimization
    );

    return { filteredProjects$, cleanup };
  };
}
