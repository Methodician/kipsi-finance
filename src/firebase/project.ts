import firebase from "firebase/app";
import "firebase/firestore";
import { filter, map } from "rxjs/operators";
import { Observable, from, Subject } from "rxjs";
import {
  ProjectCreate,
  ProjectUpdate,
  Project,
} from "../models/project.models";

export class ProjectService {
  private db: firebase.firestore.Firestore;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
  }

  createProject(project: ProjectCreate) {
    const id = this.db.collection("projects").doc().id;
    const newProject = {
      ...project,
      id,
      expenseIds: [],
    };

    return this.db.collection("projects").doc(id).set(newProject);
  }

  updateProject(project: ProjectUpdate) {
    return this.db.doc(`projects/${project.id}`).update(project);
  }

  projectById(id: string) {
    const project$ = new Subject<Project>();
    this.db
      .collection("projects")
      .doc(id)
      .onSnapshot((doc) => {
        const project = doc.data();
        if (project) {
          project$.next(project as Project);
        }
      });

    return project$;
  }

  allProjects() {
    const projects$ = new Subject<Project[]>();
    this.db.collection("projects").onSnapshot((snapshot) => {
      const projects = snapshot.docs.map((doc) => doc.data() as Project);
      projects$.next(projects);
    });

    return projects$;
  }
}
