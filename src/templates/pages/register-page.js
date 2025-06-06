export function getRegisterTemplate() {
  return `
    <section class="auth">
      <h2 class="auth__title">Register</h2>
      
      <form id="register-form" class="auth__form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
          <label for="password">Password (min 8 characters)</label>
          <input type="password" id="password" name="password" required minlength="8">
        </div>
        
        <button type="submit" class="submit-btn">Register</button>
      </form>
      
      <p class="auth__footer">
        Already have an account? <a href="#/login">Login here</a>
      </p>
    </section>
  `;
}