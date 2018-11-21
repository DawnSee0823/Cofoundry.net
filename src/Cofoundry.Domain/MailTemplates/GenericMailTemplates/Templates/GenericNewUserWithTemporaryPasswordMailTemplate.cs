﻿using Cofoundry.Core.Mail;
using Microsoft.AspNetCore.Html;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cofoundry.Domain.MailTemplates.GenericMailTemplates
{
    public class GenericNewUserWithTemporaryPasswordMailTemplate : IMailTemplate
    {
        public GenericNewUserWithTemporaryPasswordMailTemplate()
        {
            ViewFile = GenericMailTemplatePath.TemplateView(nameof(GenericNewUserWithTemporaryPasswordMailTemplate));
            SubjectFormat = "{0}: Your account has been created";
        }

        public string ViewFile { get; set; }

        public string Subject
        {
            get { return string.Format(SubjectFormat, ApplicationName); }
        }

        #region custom properties

        public string SubjectFormat { get; set; }

        public string ApplicationName { get; set; }

        public string Username { get; set; }

        public IHtmlContent TemporaryPassword { get; set; }

        public string LoginPath { get; set; }

        #endregion
    }
}
