import { useEffect } from "react"
import { ConfigState } from "./types"

export default function Assistant({ config }) {
  useEffect(() => {
    if (config.assistantRequest && config.assistantRequest.type !== "") {
      (async () => config.setAssistantResponse(await getSuggestion(config)))()
    }
  }, [config.assistantRequest])

  return <section id="assistant"
    aria-live="polite"
    aria-atomic="true"
    aria-relevant="additions text"
    aria-labelledby="assistant-heading"
  >
    {config.assistantRequest.type === "" ?
      <>
        <h2 id="assistant-heading">Assistant Suggestions</h2>
        <div id="assistant-text"
          dangerouslySetInnerHTML={{ __html: config.assistantResponse }}
        >
        </div>
      </> :
      <div className="sr-only">Asking assistant for suggestions...</div>
    }
  </section>
}

export async function getSuggestion(config: ConfigState): Promise<string> {
  const rsp = await fetch('/api/suggest', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      type: config.assistantRequest.type,
      userInput: config.assistantRequest.requestText
    })
  })

  if (!rsp.ok) {
    return `ASSISTANT ERROR ${rsp.status}`
  }

  const json = await rsp.json()

  return json.suggestion
}

