# ?? SisEUs API - Guia de Testes Manuais

Este documento cont�m todos os endpoints da API com exemplos para teste manual.

## ?? �ndice

- [Configura��o Inicial](#configura��o-inicial)
- [Autentica��o](#-autentica��o)
- [Eventos](#-eventos)
- [Apresenta��es](#-apresenta��es)
- [Presen�as](#-presen�as)
- [Check-in Global](#-check-in-global-por-pin)
- [Avalia��es](#-avalia��es)
- [Dados de Refer�ncia](#-dados-de-refer�ncia)

---

## Configura��o Inicial

### URL Base
```
https://localhost:7102/api
```

### Vari�veis
```bash
# Defina o token ap�s fazer login
export TOKEN="seu_token_aqui"
export BASE_URL="https://localhost:7102/api"
```

---

## ?? Autentica��o

### Usu�rios dispon�veis para teste

| Tipo | Nome | CPF | Email | Senha |
|------|------|-----|-------|-------|
| Admin | Admin Root | 15887784016 | admin@siseus.com | Senha@123 |
| Professor | Carlos Professor | 54449817001 | professor@siseus.com | Senha@123 |
| Estudante | Ana Ouvinte | 77489284015 | ouvinte1@siseus.com | Senha@123 |
| Estudante | Bruno Aluno | 42294419081 | ouvinte2@siseus.com | Senha@123 |
| Estudante | Carla Visitante | 22812554096 | ouvinte3@siseus.com | Senha@123 |
| Professor | Juliana Silva (Avaliadora) | 63606935091 | juliana@siseus.com | Senha@123 |
| Professor | Renato Oliveira (Avaliador) | 34824360064 | renato@siseus.com | Senha@123 |

### 1. Login
536006
**Endpoint:** `POST /api/authenticacoes/login`

```bash
# Login como Admin
curl -X POST "$BASE_URL/authenticacoes/login" \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "15887784016",
    "senha": "Senha@123"
  }'

# Login como Professor
curl -X POST "$BASE_URL/authenticacoes/login" \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "54449817001",
    "senha": "Senha@123"
  }'

# Login como Estudante
curl -X POST "$BASE_URL/authenticacoes/login" \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "77489284015",
    "senha": "Senha@123"
  }'
```

### 2. Registrar Novo Usu�rio

**Endpoint:** `POST /api/authenticacoes/registrar`

```bash
curl -X POST "$BASE_URL/authenticacoes/registrar" \
  -H "Content-Type: application/json" \
  -d '{
    "primeiroNome": "Novo",
    "sobrenome": "Usuario",
    "cpf": "12345678901",
    "email": "novo.usuario@teste.com",
    "senha": "Senha@123"
  }'
```

### 3. Buscar Usu�rios por Nome

**Endpoint:** `GET /api/authenticacoes/buscar?nome={nome}`

```bash
curl -X GET "$BASE_URL/authenticacoes/buscar?nome=Carlos" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Buscar Usu�rio por ID

**Endpoint:** `GET /api/authenticacoes/{id}`

```bash
curl -X GET "$BASE_URL/authenticacoes/1" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ?? Eventos

### 5. Criar Evento

**Endpoint:** `POST /api/eventos`
**Permiss�es:** Admin, Professor

```bash
curl -X POST "$BASE_URL/eventos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "titulo": "Semana de Tecnologia 2024",
    "dataInicio": "2025-06-15T09:00:00",
    "dataFim": "2025-06-15T18:00:00",
    "local": {
      "campus": 1,
      "departamento": "CC",
      "bloco": "A",
      "sala": "101"
    },
    "eTipoEvento": 2,
    "avaliadores": [6, 7],
    "imgUrl": "https://exemplo.com/evento.jpg",
    "codigoUnico": "TECH24",
    "apresentacoes": [
      {
        "id": null,
        "eventoId": 0,
        "titulo": "Introdu��o ao .NET 8",
        "nomeAutor": "Jo�o Silva",
        "nomeOrientador": "Maria Santos",
        "modalidade": 1
      }
    ]
  }'
```

### 6. Listar Eventos (Paginado)

**Endpoint:** `GET /api/eventos?pagina={pagina}&tamanho={tamanho}`

```bash
curl -X GET "$BASE_URL/eventos?pagina=1&tamanho=10" \
  -H "Authorization: Bearer $TOKEN"
```

### 7. Obter Evento por ID

**Endpoint:** `GET /api/eventos/{id}`

```bash
curl -X GET "$BASE_URL/eventos/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 8. Obter Evento por C�digo

**Endpoint:** `GET /api/eventos/por-codigo?codigo={codigo}`

```bash
curl -X GET "$BASE_URL/eventos/por-codigo?codigo=I1HGF9" \
  -H "Authorization: Bearer $TOKEN"
```

### 9. Atualizar Evento

**Endpoint:** `PUT /api/eventos/{id}`
**Permiss�es:** Admin, Professor

```bash
curl -X PUT "$BASE_URL/eventos/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "id": 1,
    "titulo": "A Jornada da IA - Atualizado",
    "dataInicio": "2026-01-20T09:00:00",
    "dataFim": "2026-01-20T12:00:00",
    "local": {
      "campus": 1,
      "departamento": "CC",
      "bloco": "B",
      "sala": "202"
    },
    "eTipoEvento": 2,
    "imgUrl": "https://exemplo.com/ia.jpg",
    "codigoUnico": "I1HGF9",
    "avaliadores": [6],
    "apresentacoes": []
  }'
```

### 10. Excluir Evento

**Endpoint:** `DELETE /api/eventos/{id}`
**Permiss�es:** Admin

```bash
curl -X DELETE "$BASE_URL/eventos/3" \
  -H "Authorization: Bearer $TOKEN"
```

### 11. Adicionar Participante

**Endpoint:** `POST /api/eventos/{eventoId}/participantes`
**Permiss�es:** Admin, Professor

```bash
curl -X POST "$BASE_URL/eventos/1/participantes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '5'
```

### 12. Remover Participante

**Endpoint:** `DELETE /api/eventos/{eventoId}/participantes/{participanteId}`
**Permiss�es:** Admin, Professor

```bash
curl -X DELETE "$BASE_URL/eventos/1/participantes/5" \
  -H "Authorization: Bearer $TOKEN"
```

### 13. Adicionar Avaliador

**Endpoint:** `POST /api/eventos/{eventoId}/avaliadores`
**Permiss�es:** Admin, Professor

```bash
curl -X POST "$BASE_URL/eventos/1/avaliadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '7'
```

### 14. Remover Avaliador

**Endpoint:** `DELETE /api/eventos/{eventoId}/avaliadores/{avaliadorId}`
**Permiss�es:** Admin, Professor

```bash
curl -X DELETE "$BASE_URL/eventos/1/avaliadores/7" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ?? Apresenta��es

### 15. Criar Apresenta��o

**Endpoint:** `POST /api/apresentacoes/{eventoId}`
**Permiss�es:** Admin, Professor

```bash
curl -X POST "$BASE_URL/apresentacoes/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "id": null,
    "eventoId": 1,
    "titulo": "Machine Learning para Iniciantes",
    "nomeAutor": "Lucas Ferreira",
    "nomeOrientador": "Dr. Roberto Alves",
    "modalidade": 1
  }'
```

### 16. Listar Apresenta��es de um Evento

**Endpoint:** `GET /api/apresentacoes/evento/{eventoId}`

```bash
curl -X GET "$BASE_URL/apresentacoes/evento/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 17. Obter Apresenta��o por ID

**Endpoint:** `GET /api/apresentacoes/{id}`

```bash
curl -X GET "$BASE_URL/apresentacoes/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 18. Atualizar Apresenta��o

**Endpoint:** `PUT /api/apresentacoes/{id}`
**Permiss�es:** Admin, Professor

```bash
curl -X PUT "$BASE_URL/apresentacoes/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "id": 1,
    "titulo": "IA Generativa - Vers�o Revisada",
    "nomeAutor": "Ana Silva",
    "nomeOrientador": "Prof. Carlos Souza"
  }'
```

### 19. Excluir Apresenta��o

**Endpoint:** `DELETE /api/apresentacoes/{id}`
**Permiss�es:** Admin

```bash
curl -X DELETE "$BASE_URL/apresentacoes/4" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ? Presen�as

### 20. Efetuar Check-In

**Endpoint:** `POST /api/presencas/check-in`

```bash
curl -X POST "$BASE_URL/presencas/check-in" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "eventoId": 1,
    "latitude": "-5.184846",
    "longitude": "-40.651807"
  }'
```

### 21. Efetuar Check-Out

**Endpoint:** `POST /api/presencas/check-out`

```bash
curl -X POST "$BASE_URL/presencas/check-out" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "eventoId": 1,
    "latitude": "-5.184846",
    "longitude": "-40.651807"
  }'
```

### 22. Obter Presen�a por ID

**Endpoint:** `GET /api/presencas/{id}`

```bash
curl -X GET "$BASE_URL/presencas/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 23. Listar Presen�as por Evento

**Endpoint:** `GET /api/presencas/evento/{eventoId}`
**Permiss�es:** Admin, Professor, Avaliador

```bash
curl -X GET "$BASE_URL/presencas/evento/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 24. Relat�rio de Presen�as

**Endpoint:** `GET /api/presencas/relatorio`
**Permiss�es:** Admin, Professor

```bash
curl -X GET "$BASE_URL/presencas/relatorio" \
  -H "Authorization: Bearer $TOKEN"
```

### 25. Status de Presen�a em Evento

**Endpoint:** `GET /api/presencas/status/evento/{eventoId}`

```bash
curl -X GET "$BASE_URL/presencas/status/evento/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 26. Verificar Presen�a em Evento em Andamento

**Endpoint:** `GET /api/presencas/evento-em-andamento`

```bash
curl -X GET "$BASE_URL/presencas/evento-em-andamento" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ?? Check-in Global (por PIN)

### 27. Obter PIN Ativo

**Endpoint:** `GET /api/checkin/pin-ativo`

```bash
curl -X GET "$BASE_URL/checkin/pin-ativo" \
  -H "Authorization: Bearer $TOKEN"
```

### 28. Gerar Novo PIN

**Endpoint:** `POST /api/checkin/pin`
**Permiss�es:** Admin

```bash
curl -X POST "$BASE_URL/checkin/pin" \
  -H "Authorization: Bearer $TOKEN"
```

### 29. Validar PIN

**Endpoint:** `POST /api/checkin/validar-pin`

```bash
curl -X POST "$BASE_URL/checkin/validar-pin" \
  -H "Content-Type: application/json" \
  -d '{
    "pin": "123456"
  }'
```

### 30. Registrar Check-in com PIN

**Endpoint:** `POST /api/checkin/registrar`

```bash
curl -X POST "$BASE_URL/checkin/registrar" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "pin": "123456",
    "latitude": "-5.184846",
    "longitude": "-40.651807"
  }'
```

### 31. Registrar Check-out Global

**Endpoint:** `POST /api/checkin/checkout`

```bash
curl -X POST "$BASE_URL/checkin/checkout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "latitude": "-5.184846",
    "longitude": "-40.651807"
  }'
```

### 32. Relat�rio de Check-ins

**Endpoint:** `GET /api/checkin/relatorio`
**Permiss�es:** Admin, Professor

```bash
curl -X GET "$BASE_URL/checkin/relatorio" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ? Avalia��es

### 33. Iniciar Avalia��o

**Endpoint:** `POST /api/avaliacoes/iniciar`
**Permiss�es:** Avaliador, Professor, Admin

```bash
curl -X POST "$BASE_URL/avaliacoes/iniciar" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "apresentacaoId": 1
  }'
```

### 34. Enviar Avalia��o

**Endpoint:** `POST /api/avaliacoes/{id}/enviar`
**Permiss�es:** Avaliador, Professor, Admin

```bash
curl -X POST "$BASE_URL/avaliacoes/1/enviar" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nota": 8.5,
    "parecer": "Excelente apresenta��o! Conte�do bem estruturado e boa did�tica."
  }'
```

### 35. Obter Avalia��o por ID

**Endpoint:** `GET /api/avaliacoes/{id}`
**Permiss�es:** Avaliador, Professor, Admin

```bash
curl -X GET "$BASE_URL/avaliacoes/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 36. Listar Avalia��es de uma Apresenta��o

**Endpoint:** `GET /api/avaliacoes/apresentacao/{apresentacaoId}`
**Permiss�es:** Avaliador, Professor, Admin

```bash
curl -X GET "$BASE_URL/avaliacoes/apresentacao/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 37. Listar Minhas Avalia��es

**Endpoint:** `GET /api/avaliacoes/minhas`
**Permiss�es:** Avaliador, Professor, Admin

```bash
curl -X GET "$BASE_URL/avaliacoes/minhas" \
  -H "Authorization: Bearer $TOKEN"
```

### 38. Listar Avalia��es de um Evento

**Endpoint:** `GET /api/avaliacoes/evento/{eventoId}`
**Permiss�es:** Professor, Admin

```bash
curl -X GET "$BASE_URL/avaliacoes/evento/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 39. Relat�rio de Apresenta��o

**Endpoint:** `GET /api/avaliacoes/relatorio/apresentacao/{apresentacaoId}`
**Permiss�es:** Professor, Admin

```bash
curl -X GET "$BASE_URL/avaliacoes/relatorio/apresentacao/1" \
  -H "Authorization: Bearer $TOKEN"
```

### 40. Relat�rio de Evento

**Endpoint:** `GET /api/avaliacoes/relatorio/evento/{eventoId}`
**Permiss�es:** Professor, Admin

```bash
curl -X GET "$BASE_URL/avaliacoes/relatorio/evento/1" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ?? Dados de Refer�ncia

### Enumera��es

#### Campus
| Valor | Nome |
|-------|------|
| 0 | Fortaleza |
| 1 | Crateus |

#### ETipoEvento
| Valor | Nome |
|-------|------|
| 0 | Nenhum |
| 1 | Pitch |
| 2 | Oral |
| 3 | Banner |

#### EModalidadeApresentacao
| Valor | Nome |
|-------|------|
| 0 | Poster |
| 1 | Oral |
| 2 | Pitch |
| 3 | Artistica |

#### ETipoUsuario
| Valor | Nome |
|-------|------|
| 1 | Estudante |
| 2 | Professor |
| 3 | Avaliador |
| 4 | Admin |

### Eventos Pr�-cadastrados

| ID | T�tulo | C�digo | Data In�cio |
|----|--------|--------|-------------|
| 1 | A Jornada da Intelig�ncia Artificial | I1HGF9 | 2026-01-20 09:00 |
| 2 | Descomplicando o Front-End Moderno | 7L5B3E | 2026-01-21 10:30 |

### Apresenta��es Pr�-cadastradas

| ID | EventoId | T�tulo | Autor | Modalidade |
|----|----------|--------|-------|------------|
| 1 | 1 | IA Generativa | Ana | Oral |
| 2 | 1 | Redes Neurais | Bruno | Artistica |
| 3 | 2 | React vs Vue | Carla | Oral |

### Coordenadas de Teste (Crate�s-CE)

```json
{
  "latitude": "-5.184846",
  "longitude": "-40.651807"
}
```

---

## ?? Dicas de Teste

1. **Sempre fa�a login primeiro** e salve o token retornado
2. **Use Admin** para ter acesso a todos os endpoints
3. **Verifique as permiss�es** de cada endpoint antes de testar
4. **O PIN � gerado aleatoriamente** - obtenha-o pelo endpoint `/checkin/pin-ativo`
5. **As datas dos eventos seed s�o futuras** (2026) - ajuste se necess�rio
