import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AuthenticatedScopeHarness } from './authenticated-scope.harness';

describe('type injector demo angular', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });

    await TestBed.compileComponents();
  });

  async function startComponent() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    await fixture.whenStable();
    return {
      fixture,
      loader,
    };
  }

  describe('authenticated scope', () => {
    let authScope: AuthenticatedScopeHarness;
    let fixture: ComponentFixture<AppComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      const started = await startComponent();
      fixture = started.fixture;
      loader = started.loader;
      authScope = await loader.getHarness(AuthenticatedScopeHarness);
    });

    it('should show authenticated scope', () => {
      expect(authScope).toBeTruthy();
    });

    it('should show authentication token', async () => {
      const token = await authScope.getToken();
      expect(token).toMatch(/Token[1-9]/);
    });

    it('should provide token in authenticated scope', async () => {
      const injectDirectly = await authScope.get('app-inject-directly');
      const token = await authScope.getToken();
      expect(await injectDirectly.text()).toContain(token);
    });
  });
});
