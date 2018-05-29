import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    };

    clearError() {
      this.setState({ error: null });
    }

    componentWillMount() {
      console.log("[withErrorHandler] componentWillMount()");
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.clearError();
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      console.log(
        "[withErrorHandler] componentWillUnmount()",
        this.requestInterceptor,
        this.responseInterceptor
      );
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} onClose={() => this.clearError()}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
