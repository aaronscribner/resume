import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './resume.component';
import { AboutComponent } from './about/about.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SharedModule } from '../shared/shared.module';
import { ResumeService } from '../core/http-services/resume-service/resume.service';

@NgModule({
  declarations: [
    ResumeComponent,
    AboutComponent,
    AvatarComponent,
    ContactInfoComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    CertificationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResumeRoutingModule
  ],
  providers: [
    ResumeService
  ]
})
export class ResumeModule {
}
