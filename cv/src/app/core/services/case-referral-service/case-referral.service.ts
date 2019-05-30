import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CaseService } from '../../../services/case.service';
import { AttorneyType } from '../../../shared/enums/attorney-type.enum';
import { Contact } from '../../../shared/models';
import { Attorney } from '../../../shared/models/cases/attorney.model';
import { CaseReferral } from '../../../shared/models/cases/case-referral.model';
import { Employee } from '../../../shared/models/employee/employee.model';
import { EmployeeContactService } from '../../http-services/employee-contact-service/employee-contact.service';
import { CaseReferralStep } from './case-referral-steps.enum';

@Injectable({
  providedIn: 'root'
})
export class CaseReferralService {
  private _caseReferral: BehaviorSubject<CaseReferral> = new BehaviorSubject<CaseReferral>(undefined);
  private _viewingEmployee: BehaviorSubject<Employee> = new BehaviorSubject<Employee>(undefined);
  private _isCaseReferralDirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private caseReferralData: CaseReferral;

  constructor(
    private caseService: CaseService,
    private employeeContactService: EmployeeContactService) {
  }

  public get caseReferral(): Observable<CaseReferral> {
    return this._caseReferral;
  }

  public get viewingEmployee(): Observable<Employee> {
    return this._viewingEmployee;
  }

  public get caseReferralDirty(): Observable<boolean> {
    return this._isCaseReferralDirty;
  }

  public set editingCaseReferral(isEditing: boolean) {
    this._isCaseReferralDirty.next(isEditing);
  }

  public createCaseReferral(): void {
    this.caseReferralData = new CaseReferral();
    this.caseReferralData.step = CaseReferralStep.New;
    this._caseReferral.next(this.caseReferralData);
    this._viewingEmployee.next(undefined);
  }

  public submitCase(): void {
    this.caseReferralData.step = CaseReferralStep.Submitted;
    this._caseReferral.next(this.caseReferralData);
  }

  public persistCaseInformation(caseReferral: CaseReferral): void {
    this.caseReferralData = caseReferral;
  }

  public saveCaseInformation(): void {
    this.caseService.createCase(this.caseReferralData).subscribe((response: CaseReferral) => {
      this.caseReferralData.id = response.id;
    });

    this.caseReferralData.step = CaseReferralStep.AssigningConsultant;
    this._caseReferral.next(this.caseReferralData);
  }

  public assignConsultant(employeeId: string): void {
    this.employeeContactService.read(employeeId).subscribe((contactResponse: Contact) => {
      this.caseService.updateCaseConsultants(this.caseReferralData.id, contactResponse).subscribe((caseResponse: CaseReferral) => {
        if (this.caseReferralData.consultants === undefined) {
          this.caseReferralData.consultants = [contactResponse];
        } else {
          this.caseReferralData.consultants.push((contactResponse));
        }

        this.caseReferralData.step = CaseReferralStep.AdditionalInformation;
        this._caseReferral.next(this.caseReferralData);
      });
    });
  }

  public setCurrentStep(caseReferralStep: CaseReferralStep): void {
    this.caseReferralData.step = caseReferralStep;
    this._caseReferral.next(this.caseReferralData);
  }

  public setViewingEmployee(employee: Employee): void {
    this._viewingEmployee.next(employee);
  }

  public setDefenseAttorney(attorney: Attorney): void {
    if (attorney === undefined) {
      this.caseReferralData.claims[0].additionalInformation.defenseAttorney = undefined;
      return;
    }

    if (attorney.type !== AttorneyType.Defendant) {
      // throw exception
      return;
    }

    this.caseReferralData.claims[0].additionalInformation.defenseAttorney = attorney;
  }

  public setClaimantAttorney(attorney: Attorney): void {
    if (attorney === undefined) {
      this.caseReferralData.claims[0].additionalInformation.claimantAttorney = undefined;
      return;
    }

    if (attorney.type !== AttorneyType.Claimant) {
      // throw exception
      return;
    }

    this.caseReferralData.claims[0].additionalInformation.claimantAttorney = attorney;
  }
}
