import firebase from "firebase";

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expenseIds: string[];
}
export interface DbProject {
  id: string;
  name: string;
  description: string;
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
  expenseIds: string[];
}

export interface ProjectCreate {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface ProjectUpdate {
  id: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  expenseIds?: string[];
}
