﻿using Cofoundry.Core.Json;
using Cofoundry.Core.ResourceFiles;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Cofoundry.Web.Admin
{
    /// <summary>
    /// Takes an html text stream and manipulated it to add in a couple of features required to
    /// make the site viewer work.
    /// </summary>
    /// <remarks>
    /// Designed only for use with SiteViewerContentFilterAttribute. 
    /// </remarks>
    //internal class VisualEditorContentStream : MemoryStream
    //{
    //    #region constructor

    //    const char TAB = '\t';

    //    private readonly Stream _outputStream = null;
    //    private readonly IPageResponseData _pageResponseData;
    //    private readonly IResourceLocator _resourceLocator;
    //    private readonly IJsonSerializerSettingsFactory _jsonSerializerSettingsFactory;
    //    private readonly ControllerContext _context;

    //    public VisualEditorContentStream(
    //        Stream outputStream,
    //        IPageResponseData pageResponseData,
    //        IResourceLocator resourceLocator,
    //        IJsonSerializerSettingsFactory jsonSerializerSettingsFactory,
    //        ControllerContext context
    //        )
    //    {
    //        _outputStream = outputStream;
    //        _pageResponseData = pageResponseData;
    //        _resourceLocator = resourceLocator;
    //        _jsonSerializerSettingsFactory = jsonSerializerSettingsFactory;
    //        _context = context;
    //    }

    //    #endregion

    //    #region implementation

    //    public override void Close()
    //    {
    //        var html = Encoding.UTF8.GetString(this.ToArray());

    //        // Check for not XML
    //        if (!html.StartsWith("<?xml"))
    //        {
    //            html = AddCofoundryDependencies(html);
    //        }

    //        // Write the string back to the response
    //        byte[] rawResult = Encoding.UTF8.GetBytes(html);
    //        _outputStream.Write(rawResult, 0, rawResult.Length);

    //        base.Close();
    //        _outputStream.Close();
    //    }

    //    #endregion

    //    #region html modifiers


    //    #endregion

    //    #region helpers

    //    public string RenderRazorViewToString(string viewName, object model)
    //    {
    //        using (var sw = new StringWriter())
    //        {
    //            var viewResult = ViewEngines.Engines.FindPartialView(_context, viewName);
    //            var viewContext = new ViewContext(_context, viewResult.View, new ViewDataDictionary { { "model", model } }, new TempDataDictionary { }, sw);
    //            viewResult.View.Render(viewContext, sw);
    //            viewResult.ViewEngine.ReleaseView(_context, viewResult.View);
    //            return sw.GetStringBuilder().ToString();
    //        }
    //    }

    //    public string RenderSvgToString()
    //    {
    //        var virtualFile = _resourceLocator.GetFile(VisualEditorRouteLibrary.StaticContent.Url("svg-cache.html"));

    //        using (var stream = virtualFile.Open())
    //        {
    //            var reader = new StreamReader(stream);
    //            return reader.ReadToEnd();
    //        }
    //    }

    //    #endregion
    //}
}