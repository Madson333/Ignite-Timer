import { useContext } from "react";
import { Header } from "../../components/Header";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR";

export function History() {

  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(Cycle => {
              return (
                <tr key={Cycle.id}>
                  <td>{Cycle.task}</td>
                  <td>{Cycle.minutesAmount} minutos</td>
                  <td>{formatDistanceToNow(new Date(Cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    {Cycle.finishedDate && (<Status statusColor="green">Concluido</Status>)}

                    {Cycle.interruptedDate && (<Status statusColor="red">Interrompido</Status>)}

                    {(!Cycle.finishedDate && !Cycle.interruptedDate) && (<Status statusColor="yellow">Em andamento</Status>)}
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>

    </HistoryContainer>

  )
}
