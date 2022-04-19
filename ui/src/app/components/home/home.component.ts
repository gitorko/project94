import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ClarityIcons, trashIcon} from '@cds/core/icon';
import {AlertComponent} from "../alert/alert.component";
import {RestService} from "../../services/rest.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, OnDestroy {

  voteInfo = '';
  sub: Subscription = new Subscription();
  // @ts-ignore
  @ViewChild(AlertComponent, {static: true}) private alert: AlertComponent;

  constructor(private restService: RestService, private router: Router) {
    ClarityIcons.addIcons(trashIcon);
  }

  ngOnInit(): void {
    this.sub = this.restService.getVotes().subscribe({
      next: data => {
        console.log(data);
        this.voteInfo = data;
      },
      error: err => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  saveVote(id: string): void {
    this.restService.saveVote(id)
      .subscribe(data => {
        this.alert.showSuccess('Voted for ' + id);
      }, error => {
        this.alert.showError('Forbidden!');
        console.log(error);
      });
  }

}
