export interface IEnvType {
  config: {
    server: {
      secret: string;
      host: string;
      port: number;
      env: {
        isDev: boolean,
        isProd: boolean
      }
    },
    database: {
      host: string,
      port: number,
      user: string,
      pass: string,
      name: string,
    },
    caching: {
      host: string,
      port: number,
      pass: string
    }
  }
}
