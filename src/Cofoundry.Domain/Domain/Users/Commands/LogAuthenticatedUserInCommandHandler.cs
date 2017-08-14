﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Cofoundry.Domain.Data;
using Cofoundry.Domain.CQS;
using Cofoundry.Core.EntityFramework;
using Cofoundry.Core;

namespace Cofoundry.Domain
{
    public class LogAuthenticatedUserInCommandHandler 
        : IAsyncCommandHandler<LogAuthenticatedUserInCommand>
        , IIgnorePermissionCheckHandler
    {
        #region constructor

        private readonly CofoundryDbContext _dbContext;
        private readonly IEntityFrameworkSqlExecutor _sqlExecutor;
        private readonly IClientConnectionService _clientConnectionService;

        public LogAuthenticatedUserInCommandHandler(
            CofoundryDbContext dbContext,
            IEntityFrameworkSqlExecutor sqlExecutor,
            IClientConnectionService clientConnectionService
            )
        {
            _dbContext = dbContext;
            _sqlExecutor = sqlExecutor;
            _clientConnectionService = clientConnectionService;
        }

        #endregion

        public async Task ExecuteAsync(LogAuthenticatedUserInCommand command, IExecutionContext executionContext)
        {
            var user = await Query(command.UserId).SingleOrDefaultAsync();
            EntityNotFoundException.ThrowIfNull(user, command.UserId);

            var connectionInfo = _clientConnectionService.GetConnectionInfo();
            SetLoggedIn(user, executionContext);
            await _dbContext.SaveChangesAsync();

            await _sqlExecutor.ExecuteCommandAsync(_dbContext,
                "Cofoundry.UserLoginLog_Add",
                new SqlParameter("UserId", user.UserId),
                new SqlParameter("IPAddress", connectionInfo.IPAddress),
                new SqlParameter("DateTimeNow", executionContext.ExecutionDate)
                );
        }

        private IQueryable<User> Query(int userId)
        {
            var user = _dbContext
                .Users
                .FilterById(userId)
                .FilterCanLogIn();

            return user;
        }

        private void SetLoggedIn(User user, IExecutionContext executionContext)
        {
            user.PreviousLoginDate = user.LastLoginDate;
            user.LastLoginDate = executionContext.ExecutionDate;
        }
    }
}
