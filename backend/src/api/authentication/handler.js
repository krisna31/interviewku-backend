/* eslint-disable no-unused-vars */
class AuthenticationsHandler {
  constructor({
    authenticationsService,
    usersService,
    tokenManager,
    validator,
  }) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
  }

  async postAuthenticationHandler(request, h) {
    const { email, password } = request.payload;
    const id = await this._usersService.verifyUserCredential(email, password);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    const { refreshToken } = request.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request, h) {
    const { refreshToken } = request.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }

  async changePasswordHandler(request, h) {
    const { id } = request.auth.credentials;
    const { oldPassword, newPassword } = request.payload;

    await this._usersService.verifyUserCredentialById(id, oldPassword);
    await this._usersService.editUserPassword(id, newPassword);

    return {
      status: 'success',
      message: 'Password berhasil diperbarui',
    };
  }
}

module.exports = AuthenticationsHandler;