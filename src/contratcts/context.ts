declare module "@ioc:Adonis/Core/HttpContext" {
  interface HttpContextContract {
    transform: {
      withContext: Function,
      item: Function
    };
    bouncer: any;
    filter: any;
  }
}
