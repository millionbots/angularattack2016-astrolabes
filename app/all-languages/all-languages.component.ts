import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import * as _ from 'lodash';
import * as d3 from 'd3';

import {githubService} from './../shared/github/github.service';
import {ReposService} from './../shared/repos/repos.service'
import {PaginationComponent} from './../shared/pagination/pagination.component'

@Component({
    selector: 'my-language',
    templateUrl: 'app/all-languages/all-languages.component.html',
    directives: [PaginationComponent],
    providers: [githubService, ReposService],
    styleUrls: ['app/all-languages/all-languages.component.css']
})

export class AllLanguagesComponent implements OnInit {
    repos:any[];
    paginatedRepos = [];
    pageSize = 12;

    constructor(private _reposService:ReposService,
                private _router:Router) {
    }

    ngOnInit() {
        this.repos = this._reposService.getRepos();
        this.paginatedRepos = _.take(this.repos, this.pageSize);
    }

    navigateToLanguage(selectedLanguage) {
        if (selectedLanguage.languageStateName) {
            this._router.navigate(['Language', {languageName: selectedLanguage.languageStateName}]);
        }
    }

    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.paginatedRepos = _.take(_.drop(this.repos, startIndex), this.pageSize);
    }
}