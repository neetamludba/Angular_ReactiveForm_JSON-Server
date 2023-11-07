import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestAttemptService } from '../test-attempt.service';

@Component({
  selector: 'app-view-test-attempt',
  templateUrl: './view-test-attempt.component.html',
  styleUrls: ['./view-test-attempt.component.css'],
})
export class ViewTestAttemptComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly testAttemptService: TestAttemptService
  ) { }

  questionsAnswers: any;
  testDescription: string = '';
  userName: any = null;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.getAttemptDetails(id);
    }
  }



  getAttemptDetails(assignmentID: number) {
    this.testAttemptService
      .getTestAttemptForAssignmentWithAnswers(assignmentID)
      .then((attemptDetails) => {
        console.log({ attemptDetails });

        this.testDescription = attemptDetails!.testDescription;
        this.questionsAnswers = attemptDetails!.questionsAnswers.sort(
          (a: any, b: any) => a.id - b.id
        );
      })
    this.filterByParams()
      .catch((err) => console.log(err));
  }
  
  async filterByParams() {
    const params = this.route.snapshot.queryParams;

    if (params['user']) {
      // Retrieve the user name from the query parameters
      const userName = decodeURIComponent(params['user']);
      // Call the filter method with the user name
      this.userName = userName;
    }
  }
}
