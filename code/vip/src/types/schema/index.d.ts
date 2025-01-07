declare namespace Schema {
  interface User {
    type: string;
    token: string;
    expireIn: number;
    isManager: boolean;
    username: string;
    permissions: string[];
    userId: number;
    positionType: number;
    resetPwd: boolean;
  }
}
