import { Badge } from "#/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "#/components/ui/card"
import { methodColors, getStatusBadgeColor } from "#/lib/endpoint-constants"
import { useTheme } from "#/hooks/use-theme"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { EndpointModel } from "#/models/endpoint-model"

type EndpointDetailsProps = {
  endpoint: EndpointModel
}

export function EndpointDetails({ endpoint }: EndpointDetailsProps) {
  const { theme } = useTheme()
  const statusColor = getStatusBadgeColor(endpoint.statusCode)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Badge className={methodColors[endpoint.method]}>
            {endpoint.method}
          </Badge>
          <CardTitle className="font-mono text-xl">{endpoint.path}</CardTitle>
        </div>
        <CardDescription>
          Endpoint configuration and response preview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Status Code
            </h4>
            <Badge className={statusColor}>{endpoint.statusCode}</Badge>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Delay (ms)
            </h4>
            <p className="font-mono">{endpoint.delay} ms</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Response Body (JSON)
          </h4>
          <div className="rounded-md border overflow-hidden">
            <SyntaxHighlighter
              language="json"
              style={theme === "dark" ? oneDark : oneLight}
              customStyle={{ margin: 0, padding: "1rem", fontSize: "0.875rem" }}
              showLineNumbers
            >
              {JSON.stringify(endpoint.responseBody, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        Endpoint ID: {endpoint.id}
      </CardFooter>
    </Card>
  )
}
