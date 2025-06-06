export function getLoginTemplate() {
    return `
      <section class="auth">
        <h2 class="auth__title">Login</h2>
        
        <form id="login-form" class="auth__form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required minlength="8">
          </div>
          
          <button type="submit" class="submit-btn">Login</button>
        </form>
        
        <p class="auth__footer">
          Don't have an account? <a href="#/register">Register here</a>
        </p>
      </section>
    `;
  }