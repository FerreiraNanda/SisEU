using SisEUs.Domain.Checkin.Entidades;

namespace SisEUs.Domain.Checkin.Interfaces
{
    public interface ICheckinPinRepositorio
    {
        Task<CheckinPin?> ObterPinAtivoAsync();
        Task<CheckinPin?> ObterPinPorValorAtivoAsync(string pin); 
        void Adicionar(CheckinPin pin);
        void Atualizar(CheckinPin pin);
        Task<IEnumerable<CheckinPin>> ObterTodosPinsAsync();
    }
}