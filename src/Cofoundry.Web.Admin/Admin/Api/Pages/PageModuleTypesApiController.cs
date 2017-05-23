﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cofoundry.Domain;
using Cofoundry.Domain.CQS;
using Cofoundry.Web.WebApi;

namespace Cofoundry.Web.Admin
{
    [AdminApiRoute("page-module-types")]
    public class PageModuleTypesApiController : BaseAdminApiController
    {
        #region private member variables
        
        private readonly IQueryExecutor _queryExecutor;
        private readonly IApiResponseHelper _apiResponseHelper;

        #endregion

        #region constructor

        public PageModuleTypesApiController(
            IQueryExecutor queryExecutor,
            IApiResponseHelper apiResponseHelper
            )
        {
            _queryExecutor = queryExecutor;
            _apiResponseHelper = apiResponseHelper;
        }

        #endregion

        #region routes

        #region queries

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var results = await _queryExecutor.GetAllAsync<PageModuleTypeSummary>();
            return _apiResponseHelper.SimpleQueryResponse(this, results);
        }

        [HttpGet("{pageModuleTypeId:int}")]
        public async Task<IActionResult> Get(int pageModuleTypeId)
        {
            var results = await _queryExecutor.GetByIdAsync<PageModuleTypeDetails>(pageModuleTypeId);
            return _apiResponseHelper.SimpleQueryResponse(this, results);
        }

        #endregion

        #endregion
    }
}