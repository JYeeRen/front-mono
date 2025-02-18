import { Component, ErrorInfo, PropsWithChildren } from "react";
import { message } from "antd";
// type ErrorBoundaryState =
//   | {
//       didCatch: true;
//       error: any;
//       block: boolean;
//     }
//   | {
//       didCatch: false;
//       block: false;
//       error: null;
//     };

// const initialState: ErrorBoundaryState = {
//   didCatch: false,
//   block: false,
//   error: null,
// };

interface BoundaryProps extends PropsWithChildren {
}

export class ErrorBoundary extends Component<BoundaryProps> {
  // private readonly handler: ErrorHandler;

  constructor(props: BoundaryProps) {
    super(props);
    // this.state = initialState;
    // this.handler = new ErrorHandler();

    // this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    // this.catchError = this.catchError.bind(this);
    // this.catchRejectEvent = this.catchRejectEvent.bind(this);

  }

  /**
   * 返回值会更新到组件的 state 中
   */
  static getDerivedStateFromError(error: Error) {
    message.error(error.message);
    // logger.errorBoundary("getDerivedStateFromError");
    // return { didCatch: true, error, block: true };
    return { hasError: true };
  }  

  // resetErrorBoundary() {
  //   const { error } = this.state;
  //   if (error !== null) {
  //     this.setState(initialState);
  //   }
  // }

  /**
   * 只能捕获 react 渲染异常
   */ 
  componentDidCatch(error: Error, info: ErrorInfo) {
    // this.handler.handleRenderError(error, info);
    // logger.errorBoundary("TODO 解析错误类型");
  }

  componentDidMount(): void {
    window.addEventListener('error', this.catchError, true);
    window.addEventListener('unhandledrejection', this.catchRejectEvent, true);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.catchError, true);
    window.removeEventListener('unhandledrejection', this.catchRejectEvent, true);
  }

  /**
   * 捕获「同步方法 & 异步方法 & 资源加载 异常」
   */
  private catchError(error: ErrorEvent): void {
    console.error(error);
    // logger.errorBoundary('catchError');
    // logger.errorBoundary(error);
    // const parsed = this.handler.handleUncaughtError(error);
    // if (parsed.type === "ignore") {
    //   return;
    // }

    // return this.alert(parsed.formatted ?? parsed.message);
  }

  /**
   * 捕获「promise & async/await 异常」
   */
  private catchRejectEvent(error: PromiseRejectionEvent): void {
    console.error(error);
    message.error('666');
    // logger.errorBoundary("catchRejectEvent");
    // logger.errorBoundary(error);
    // const parsed = this.handler.handleRejectError(error);
    // if (parsed.type === "ignore") {
    //   return;
    // }
    // if (parsed.type === "alert") {
    //   return this.alert(parsed.formatted ?? parsed.message);
    // }
    // if (parsed.type === "confirm") {
    //   return this.confirm(parsed.formatted ?? parsed.message);
    // }

    // this.setState({ error: parsed });
  }

  // alert(msg: string | string[]) {
  //   message.error(msg);
  // }

  // confirm(msg: string | string[]) {
  //   logger.infra("confrim", msg);
  // }

  render() {
    // logger.errorBoundary('render', this.props, this.state);
    // if (this.state.block) {
      // return (<div>Ops!</div>);
    // }

    return this.props.children;
  }
}
