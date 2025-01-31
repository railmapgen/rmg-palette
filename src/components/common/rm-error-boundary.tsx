import { Component, ReactNode, Suspense } from 'react';
import ErrorDetail from './error-detail';
import { AlertProps } from '@mantine/core';

type RMErrorBoundaryProps = {
    children?: ReactNode;
    suspenseFallback?: ReactNode; // for lazy loaded children
    allowReset?: boolean;
} & AlertProps;

export default class RMErrorBoundary extends Component<RMErrorBoundaryProps, any> {
    constructor(props: RMErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        const { children, suspenseFallback, allowReset, ...others } = this.props;

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ErrorDetail
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    allowReset={allowReset}
                    {...others}
                />
            );
        }

        return suspenseFallback ? <Suspense fallback={suspenseFallback}>{children}</Suspense> : children;
    }
}
