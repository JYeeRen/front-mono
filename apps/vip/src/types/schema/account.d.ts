declare namespace Schema {
  interface Account {
    type: string;
    token: string;
    expireIn: number;
    isManager: true;
    username: string;
    permissions: [string];
    userId: number;
    positionType: number;
    resetPwd: boolean;
  }
}
