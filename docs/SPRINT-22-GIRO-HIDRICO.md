# Sprint 22: Giro hidrico del producto

## Objetivo

Reorientar AgroNodo desde una plataforma de monitoreo agricola hacia una plataforma de gestion inteligente del agua en agricultura.

## Decision estrategica

AgroNodo no debe competir como dashboard generico de sensores. El eje del producto sera ayudar a productores y territorios a producir mas usando menos agua.

## Cambios funcionales

- `FarmWaterProfile`: perfil hidrico demo por finca.
- Eficiencia hidrica como indicador principal.
- Uso semanal estimado de agua.
- Ahorro semanal potencial.
- Estado de riego: deficit, adecuado o exceso.
- Recomendacion hidrica por finca.
- Ruta de finca centrada en agua:
  - Registrada.
  - Caracterizacion hidrica.
  - Diagnostico de uso del agua.
  - Plan hidrico.
  - Monitoreo hidrico.
  - Optimizacion del riego.
  - Ahorro hidrico estimado.
  - Sostenibilidad hidrica verificada.

## Interfaces impactadas

- Dashboard principal: prioriza agua, ahorro potencial y eficiencia hidrica.
- Fincas: muestra eficiencia, uso estimado, ahorro posible y estado de riego.
- Detalle de finca: guia hidrica AgroNodo.
- Caracterizacion: pasa a ser caracterizacion hidrica.

## Riesgos

- No confundir ahorro estimado con ahorro comprobado.
- No prometer exactitud sin medidores de caudal.
- Mantener clima, suelo, alertas e IA como capacidades de soporte al objetivo hidrico.

## Decision CTO

AgroNodo sera water-first, no water-only. El agua sera la metrica principal; sensores, alertas, historicos e IA seran medios para mejorar decisiones de riego y demostrar impacto.
