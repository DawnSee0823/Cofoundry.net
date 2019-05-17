﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cofoundry.Domain
{
    /// <summary>
    /// Queries for retieving user data by a unique database id.
    /// </summary>
    public interface IContentRepositoryUserByIdQueryBuilder
    {
        /// <summary>
        /// The UserMicroSummary is a minimal projection of user data 
        /// that is quick to load.
        /// </summary>
        Task<UserMicroSummary> AsMicroSummary();

        /// <summary>
        /// The UserDetails projection is a full representation of a user, containing 
        /// all properties including role and permission data. If the user is not logged 
        /// in then null is returned.
        /// </summary>
        Task<UserDetails> AsDetails();
    }
}
