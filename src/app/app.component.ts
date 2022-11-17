import {Component, OnInit} from '@angular/core';
import {authConfig} from "./config/authConfig";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {ProductService} from "./services/product.service";
import {UserService} from "./services/user.service";
import {Branch} from "./model/branch";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'loan-follow-up';
  isCollapsed = false;

  product: any;
  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;
  userBranch?: Branch;
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private userService: UserService
  ) {
  }

  get authenticatedUserName() {
    return (this.authService.getTokenDetails() as any).name;
  }
  ngOnInit(): void {
    this.init();
    this.loadProducts();
    this.getUserBranch();
  }
  loadProducts(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.productService.getProduct(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.product = res._embedded.productsDTOes;
        this.totalElements = res.page.totalElements;

      })

  }
  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public get userName() {
    const cliams = this.oauthService.getIdentityClaims();
    if (!cliams) { return null; }

    return (cliams as any).given_name;
  }

  public init() {
    // @ts-ignore
    this.router.navigate['/'];
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.setStorage(localStorage);
    this.oauthService.setupAutomaticSilentRefresh();
  }
  get currentYear() {
    return new Date().getFullYear();
  }


  checkPermission(permission: string): boolean {
    const decodedToken: any = jwt_decode(this.oauthService.getAccessToken());
    console.log("permission=");
    console.log((decodedToken['realm_access']['roles'] as Array<string>)
      .some((p) => permission === p));
    return (decodedToken['realm_access']['roles'] as Array<string>)
            .some((p) => permission === p);
  }
  getUserBranch() {
    this.userService
      .getUserBranch(this.userService.getEmployeeId())
      .subscribe((data) => {
        this.userBranch = data.branch;
      });
  }

}
