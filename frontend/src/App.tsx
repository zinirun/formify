import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './common/pages/HomePage';
import WorkSpacePage from './workspace/pages/WorkSpacePage';
import GuidePage from './common/pages/GuidePage';
import DoPage from './do/pages/DoPage';
import DoPreviewPage from './do/pages/DoPreviewPage';
import Result404 from './common/components/Result404';
import Root from './common/components/Root';
import './App.less';

function App() {
    return (
        <Router>
            <Root>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/workspace" component={WorkSpacePage} />
                    <Route path="/guide" component={GuidePage} />
                    <Route path="/do/:pubUrl" component={DoPage} />
                    <Route path="/preview/:formId" component={DoPreviewPage} />
                    <Route component={Result404} />
                </Switch>
            </Root>
        </Router>
    );
}

export default App;
