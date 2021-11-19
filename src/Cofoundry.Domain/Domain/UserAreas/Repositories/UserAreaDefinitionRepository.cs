﻿using Cofoundry.Core;
using System.Collections.Generic;
using System.Linq;

namespace Cofoundry.Domain.Internal
{
    /// <inheritdoc/>
    public class UserAreaDefinitionRepository : IUserAreaDefinitionRepository
    {
        private readonly Dictionary<string, IUserAreaDefinition> _userAreas;
        private readonly IUserAreaDefinition _defaultUserArea;

        public UserAreaDefinitionRepository(
            IEnumerable<IUserAreaDefinition> userAreas
            )
        {
            DetectInvalidDefinitions(userAreas);
            _userAreas = userAreas.ToDictionary(k => k.UserAreaCode);
            _defaultUserArea = userAreas
                .OrderByDescending(u => u.IsDefaultAuthScheme)
                .ThenByDescending(u => u is CofoundryAdminUserArea)
                .ThenBy(u => u.Name)
                .FirstOrDefault();
        }

        public IUserAreaDefinition GetRequiredByCode(string userAreaCode)
        {
            var area = _userAreas.GetOrDefault(userAreaCode);

            if (area == null)
            {
                throw new EntityNotFoundException<IUserAreaDefinition>(userAreaCode, $"UserArea '{userAreaCode}' is not registered. but has been requested.");
            }

            return area;
        }

        public IEnumerable<IUserAreaDefinition> GetAll()
        {
            return _userAreas.Select(a => a.Value);
        }

        public IUserAreaDefinition GetDefault()
        {
            return _defaultUserArea;
        }

        private void DetectInvalidDefinitions(IEnumerable<IUserAreaDefinition> definitions)
        {
            var nullName = definitions
                .Where(d => string.IsNullOrWhiteSpace(d.UserAreaCode))
                .FirstOrDefault();

            if (nullName != null)
            {
                var message = nullName.GetType().Name + " does not have a definition code specified.";
                throw new InvalidUserAreaDefinitionException(message, nullName, definitions);
            }

            var duplicateCode = definitions
                .GroupBy(e => e.UserAreaCode)
                .Where(g => g.Count() > 1)
                .FirstOrDefault();

            if (duplicateCode != null)
            {
                var message = "Duplicate IUserAreaDefinition.UserAreaCode: " + duplicateCode.Key;
                throw new InvalidUserAreaDefinitionException(message, duplicateCode.First(), definitions);
            }

            var nameNot3Chars = definitions
                .Where(d => d.UserAreaCode.Length != 3)
                .FirstOrDefault();

            if (nameNot3Chars != null)
            {
                var message = nameNot3Chars.GetType().Name + " has a definition code that is not 3 characters in length. All user area definition codes must be 3 characters.";
                throw new InvalidUserAreaDefinitionException(message, nameNot3Chars, definitions);
            }

            var defaultUserAreas = definitions
                .Where(d => d.IsDefaultAuthScheme)
                .Select(d => d.UserAreaCode);

            if (defaultUserAreas.Skip(1).FirstOrDefault() != null)
            {
                var message = "More than one user area has IsDefaultAuthSchema defined. Only a single default user area can be defined. Duplicates: " + string.Join(", ", defaultUserAreas);
                throw new InvalidUserAreaDefinitionException(message, nameNot3Chars, definitions);
            }
        }
    }
}
