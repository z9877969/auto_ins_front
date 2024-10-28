import { Component } from 'react';
import { addLogApi } from '../../services/api';
import ErrorBoundaryModal from '../ErrorBoundaryModal/ErrorBoundaryModal';
import * as S from './ErrorBoundary.styled';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.logErrorToMyService(error, info.componentStack);
  }

  logErrorToMyService = async (error) => {
    await addLogApi({ errorMessage: error.message, ...error });
  };

  render() {
    if (this.state.hasError) {
      return (
        <S.Wrapper>
          <ErrorBoundaryModal />
        </S.Wrapper>
      );
    }

    return this.props.children;
  }
}
