export interface UserProfile {
    FirstName: string;
    LastName: string;
    Email: string;
  }

export interface UserLogin {
    token:string,
    employeeId: number,
    role: number,
}

