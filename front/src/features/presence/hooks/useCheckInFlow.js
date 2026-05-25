import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { CheckinService } from '../../../services/checkinService';

export const useCheckInFlow = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = () => setError(null);

    const validarPin = async (inputPin, tipo = 'checkin') => {
        if (inputPin.length !== 6) {
            setError("O código deve ter 6 dígitos.");
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const resultado = await CheckinService.validarPin(inputPin);

            localStorage.setItem('currentPin', inputPin);
            localStorage.setItem('pinValidado', inputPin);

            if (resultado?.eventoId) {
                localStorage.setItem('eventoId', resultado.eventoId);
            }

            if (resultado?.sessaoId) {
                localStorage.setItem('sessaoId', resultado.sessaoId);
            }

            navigate(`/presenca/${tipo}/geolocation`);
            
        } catch (err) {
            const apiError = err.message || "Código de Check-in inválido ou expirado.";
            setError(apiError);
        } finally {
            setLoading(false);
        }
    };
    
    return {
        loading,
        error,
        validarPin,
        clearError,
    };
};