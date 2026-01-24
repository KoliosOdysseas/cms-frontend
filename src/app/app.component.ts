import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

// Top-level application component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private router = inject(Router);
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home')
  }

  
  @HostListener('window:scroll')
  onScroll() {
    const topbar = document.getElementById('topbar');
    if (!topbar) return;

    if (window.scrollY > 6) {
      topbar.classList.add('is-scrolled');
    } else {
      topbar.classList.remove('is-scrolled');
    }
  }
}
