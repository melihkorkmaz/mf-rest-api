import OrdersRoute from './orders/orders.route';
import AuthRoute from './auth/auth.route';
import RestaurantsRoute from './restaurants/restaurants.route';
import UsersRoute from './users/users.route';
import CouponRoute from './coupons/coupons.route';

export function appRoutes(app) {
  app.use(OrdersRoute.routePrefix, OrdersRoute.route());
  app.use(AuthRoute.routePrefix, AuthRoute.route());
  app.use(RestaurantsRoute.routePrefix, RestaurantsRoute.route());
  app.use(UsersRoute.routePrefix, UsersRoute.route());
  app.use(CouponRoute.routePrefix, CouponRoute.route());
}
