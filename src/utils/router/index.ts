import { Block } from '@/utils/block';
import { Nullable } from '@/types';

import { Route } from './utils/route';

class Router {
  routes: Route[] = [];

  history = window.history;

  private _currentRoute: Nullable<Route> = null;

  private _rootQuery: string = '#app';

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event) => {
      const onRouteTarget = event.currentTarget as Window;
      this._onRoute(onRouteTarget.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return (
      this.routes.find((route) => route.match(pathname))
      || this.routes.find((route) => route.match('/404'))
    );
  }

  back() {
    if (!this.history) {
      return;
    }

    this.history.back();
  }

  forward() {
    if (!this.history) {
      return;
    }

    this.history.forward();
  }
}

export const router = new Router();
