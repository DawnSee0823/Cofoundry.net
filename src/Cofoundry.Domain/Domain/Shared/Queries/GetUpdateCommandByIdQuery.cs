﻿namespace Cofoundry.Domain.CQS
{
    /// <summary>
    /// A generic query to get a pre-populated update command of the specified type.
    /// This is typically used in as part of a API patch operation where the update 
    /// command is first loaded and then modified with only the parameters that need
    /// to be changed.
    /// </summary>
    /// <typeparam name="TCommand"><see cref="ICommand"/>type to fetch.</typeparam>
    public class GetUpdateCommandByIdQuery<TCommand>
        : IQuery<TCommand>
        where TCommand : ICommand
    {
        public GetUpdateCommandByIdQuery()
        {
        }

        /// <summary>
        /// Initializes the query with the specified parameters.
        /// </summary>
        /// <param name="id">
        /// The integer database identifier of the entity associated with
        /// update command.
        /// </param>
        public GetUpdateCommandByIdQuery(int id)
        {
            Id = id;
        }

        /// <summary>
        /// The integer database identifier of the entity associated with
        /// update command.
        /// </summary>
        public int Id { get; set; }
    }
}
