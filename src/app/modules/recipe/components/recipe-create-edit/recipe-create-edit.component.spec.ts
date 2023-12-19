import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreateEditComponent } from './recipe-create-edit.component';

describe('RecipeCreateEditComponent', () => {
  let component: RecipeCreateEditComponent;
  let fixture: ComponentFixture<RecipeCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCreateEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
