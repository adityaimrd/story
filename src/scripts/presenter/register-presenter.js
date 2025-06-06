import RegisterView from '../views/register-view.js';
import API from '../data/api.js';

class RegisterPresenter {
  constructor() {
    this._view = new RegisterView();
  }

  async show() {
    this._view.render();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._view.bindSubmit(async () => {
      const { name, email, password } = this._view.getFormData();
      const submitButton = this._view.getSubmitButton();

      if (password.length < 8) {
        this._view.showAlert('Password must be at least 8 characters');
        return;
      }

      try {
        const originalText = this._view.showButtonLoading(submitButton);

        const { error, message } = await API.register({ name, email, password });

        if (error) {
          throw new Error(message);
        }

        this._view.showAlert('Registration successful! Please login.');
        window.location.hash = '#/login';
      } catch (error) {
        this._view.showAlert(`Registration failed: ${error.message}`);
      } finally {
        this._view.hideButtonLoading(submitButton, originalText);
      }
    });
  }
}

export default RegisterPresenter;
