import Cookies from "js-cookie";
// import Cookies from "universal-cookie";

class TrackingService {
  private cookiesInstance: any;

  /**
   * Create instance cookies with context or not base on server-side or client-side
   * @param context
   */
  constructor(context?: any) {
    if (context) {
      this.cookiesInstance = context.cookies;
    } else {
      this.cookiesInstance = Cookies;
    }
  }

  /**
   * Get token tracking by the key "codestus_tracking_token"
   * @returns
   */
  getTokenTracking(): string | undefined | null {
    const valueCookiesOnServerSide = this.cookiesInstance?.codestus_tracking_token;

    if (valueCookiesOnServerSide) {
      return valueCookiesOnServerSide;
    } else {
      try {
        const valueCookiesOnClientSide = this.cookiesInstance?.get("codestus_tracking_token");
        return valueCookiesOnClientSide;
      } catch (e: any) {
        return "";
      }
    }
  }
}

function trackingService(context?: any) {
  if (context) {
    return new TrackingService(context);
  }

  return new TrackingService();
}

export default trackingService;
