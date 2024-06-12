import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { TestServiceService } from '../../services/testService/test-service.service';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.scss'
})
export class HomeTestComponent implements OnInit {
	vendorsList: any = [];
	constructor(private _TestServiceService: TestServiceService) {}

	ngOnInit(): void {
		this.getVendors();
	}

	public getVendors(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._TestServiceService.getVendorsPublicList().pipe(
				map(actions => actions.map(a => {
					const data = a.payload.doc.data() as any;
					const id = a.payload.doc.id;
					return { id, ...data };
				}))
			).subscribe({
				next: async (response: any) => {
					this.vendorsList = response;
					resolve(true)
				},
				error: (error) => {
					console.log(error)
					// treat error
				},
			});
		})
	}
}
