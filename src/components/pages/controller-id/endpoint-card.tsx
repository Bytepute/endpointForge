import type { EndpointDTO } from "#/backend/dtos/endpoint.dto"
import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table"
import { CreateEndpointDialog } from "./create-endpoint-dialog"
import { EditEndpointDialog } from "./edit-endpoint-dialog"
import { ConfirmDialog } from "../shared/confirm-dialog"

type Props = {
  endpoints: EndpointDTO[] | undefined
  basePath: string
  handleDeleteEndpoint: (endpointId: string) => void
  deleteId: string | null
  controllerId: string
}

export function EndpointCard({
  endpoints,
  basePath,
  handleDeleteEndpoint,
  deleteId,
  controllerId,
}: Props) {
  const isEmpty = !endpoints || endpoints.length === 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Endpoints</CardTitle>
        <CreateEndpointDialog basePath={basePath} controllerId={controllerId} />
      </CardHeader>

      <CardContent>
        {isEmpty && (
          <div className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No endpoints found.</p>
          </div>
        )}

        {!isEmpty && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow key={endpoint.id}>
                  <TableCell>
                    <Badge variant="secondary">{endpoint.method}</Badge>
                  </TableCell>

                  <TableCell>
                    {basePath}
                    {endpoint.path}
                  </TableCell>

                  <TableCell>{endpoint.statusCode}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <EditEndpointDialog endpoint={endpoint} />
                    <ConfirmDialog
                      trigger={<Button variant="destructive">Delete</Button>}
                      onConfirm={() => handleDeleteEndpoint(endpoint.id)}
                      loading={deleteId === endpoint.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
