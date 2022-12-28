export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
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
}
