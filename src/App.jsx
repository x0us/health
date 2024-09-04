import { lazy} from "solid-js";
import AppErrorBoundary from './modules/appErrorBoundary';
import { RootProvider } from './modules/rootProvider'
import { Router, Route } from "@solidjs/router";

export const homePage = lazy(() => import("./pages/home"));

export default () => {
    return (
        // <AppErrorBoundary>
            <RootProvider>
                <Router>
                    <Route path="/" component={homePage} />
                </Router>                
            </RootProvider>        
        // </AppErrorBoundary>
    );
}