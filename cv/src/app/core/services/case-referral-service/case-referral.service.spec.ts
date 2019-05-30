import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Employee } from 'app/shared/models/employee/employee.model';
import { Observable, of } from 'rxjs';
import { CaseService } from '../../../services/case.service';
import { Contact } from '../../../shared/models';
import { CaseReferral } from '../../../shared/models/cases/case-referral.model';
import { EmployeeContactService } from '../../http-services/employee-contact-service/employee-contact.service';
import { CaseReferralStep } from './case-referral-steps.enum';
import { CaseReferralService } from './case-referral.service';
import { AdditionalInformationType } from '../../../shared/enums/additional-information-type.enum';

class MockCaseService {
  public createCase(caseItem: CaseReferral): Observable<CaseReferral> {
    const result = new CaseReferral();
    result.step = CaseReferralStep.New;
    return of(result);
  }
  public updateCaseConsultants(caseId: string | number, consultant: Contact): Observable<CaseReferral> {
    return of(new CaseReferral());
  }
}

class MockEmployeeContactService {
  public read(id: number | string): Observable<Contact> {
    return of(new Contact());
  }
}

describe('CaseReferralService', () => {
  let caseReferralService: CaseReferralService;
  let caseService: CaseService;
  let employeeContactService: EmployeeContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: CaseService, useClass: MockCaseService },
        { provide: EmployeeContactService, useClass: MockEmployeeContactService }
      ],
    });
    caseReferralService = TestBed.get(CaseReferralService);
    caseService = TestBed.get(CaseService);
    employeeContactService = TestBed.get(EmployeeContactService);
  });

  it('should be caseInformation', () => {
    expect(caseReferralService).toBeTruthy();
  });

  describe('when saving case information', () => {
    it('should call case service to create the case', () => {
      const sut = spyOn(caseService, 'createCase').and.callThrough();
      const caseReferral = new CaseReferral();
      caseReferralService.persistCaseInformation(caseReferral);
      
      caseReferralService.saveCaseInformation();
      
      expect(sut).toHaveBeenCalled();
    });

    it('should stream a case referral with the step of assigningConsultant', fakeAsync(() => {
      spyOn(caseService, 'createCase').and.callThrough();
      let caseReferral = new CaseReferral();
      caseReferralService.persistCaseInformation(caseReferral);

      caseReferralService.caseReferral.subscribe((result: CaseReferral) => {
        caseReferral = result;
      });

      caseReferralService.saveCaseInformation();
      tick(1);

      expect(caseReferral.step).toBe(CaseReferralStep.AssigningConsultant);
    }));
  });

  describe('when assigning a consultant', () => {
    it('should call assign consultant to assign the consultant', () => {
      const employeeId = '3456';
      const sut = spyOn(employeeContactService, 'read').and.callThrough();
      const caseReferral = new CaseReferral();
      caseReferralService.persistCaseInformation(caseReferral);

      caseReferralService.assignConsultant(employeeId);

      expect(sut).toHaveBeenCalled();
    });

    it('should call assign consultant to assign the consultant', () => {
      const employeeId = '3456';
      const sut = spyOn(caseService, 'updateCaseConsultants').and.callThrough();
      const caseReferral = new CaseReferral();
      caseReferral.id = '678';
      caseReferralService.persistCaseInformation(caseReferral);
      
      caseReferralService.assignConsultant(employeeId);
      
      expect(sut).toHaveBeenCalled();
    });

    it('should stream a assigned consultant with the step of additionalInformation', fakeAsync(() => {
      const employeeId = '3456';
      spyOn(employeeContactService, 'read').and.callThrough();
      spyOn(caseService, 'updateCaseConsultants').and.callThrough();
      let caseReferral = new CaseReferral();
      caseReferralService.persistCaseInformation(caseReferral);

      caseReferralService.caseReferral.subscribe((result: CaseReferral) => {
        caseReferral = result;
      });

      caseReferralService.assignConsultant(employeeId);
      tick(1);

      expect(caseReferral.step).toBe(CaseReferralStep.AdditionalInformation);
    }));
  });

  describe('when setting a step', () => {
    it('should set the step', fakeAsync(() => {
      let caseReferral = new CaseReferral();
      caseReferralService.persistCaseInformation(caseReferral);

      caseReferralService.caseReferral.subscribe((result: CaseReferral) => {
        caseReferral = result;
      });

      caseReferralService.setCurrentStep(CaseReferralStep.AdditionalInformation);
      tick(1);

      expect(caseReferral.step).toBe(CaseReferralStep.AdditionalInformation);
    }));
  });

  describe('when creating a case referral', () => {
    it('should create a case referral', fakeAsync(() => {
      let caseReferral;

      caseReferralService.caseReferral.subscribe((result: CaseReferral) => {
        caseReferral = result;
      });
      caseReferralService.createCaseReferral();
      tick(1);

      expect(caseReferral.step).toBe(CaseReferralStep.New);
    }));
  });

  describe('when setting the employee', () => {
    it('should view the set employee', fakeAsync(() => {
      const viewingEmployee = new Employee();
      let viewingEmployeeResult;

      caseReferralService.viewingEmployee.subscribe((result: Employee) => {
        viewingEmployeeResult = result;
      });

      caseReferralService.setViewingEmployee(viewingEmployee);
      tick(1);

      expect(viewingEmployeeResult).toBeTruthy();
    }));
  });
});
