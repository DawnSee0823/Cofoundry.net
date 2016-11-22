﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain.CQS
{
    /// <summary>
    /// Factory for creating an IExecutionContext instance
    /// </summary>
    public interface IExecutionContextFactory
    {
        /// <summary>
        /// Creates an instance of IExecutionContext from the currently
        /// logged in user.
        /// </summary>
        IExecutionContext Create();

        /// <summary>
        /// Creates an instance of IExecutionContext from the
        /// specified IUserContext. Can be used to impersonate another user.
        /// </summary>
        /// <param name="userContext">IUserContext to impersonate</param>
        IExecutionContext Create(IUserContext userContext);

        /// <summary>
        /// Creates an instance of IExecutionContext using the system account. Should 
        /// be used sparingly for elevating permissions, typically for back-end processes.
        /// </summary>
        IExecutionContext CreateSystemUserContext();

        /// <summary>
        /// Creates an instance of IExecutionContext using the system account. Should 
        /// be used sparingly for elevating permissions, typically for back-end processes.
        /// </summary>
        Task<IExecutionContext> CreateSystemUserContextAsync();
    }
}
