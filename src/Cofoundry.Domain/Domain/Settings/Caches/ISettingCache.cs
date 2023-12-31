﻿namespace Cofoundry.Domain;

public interface ISettingCache
{
    void Clear();

    Dictionary<string, string> GetOrAddSettingsTable(Func<Dictionary<string, string>> getter);

    Task<Dictionary<string, string>> GetOrAddSettingsTableAsync(Func<Task<Dictionary<string, string>>> getter);
}
