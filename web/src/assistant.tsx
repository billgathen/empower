import { useEffect } from "react"
import { ConfigState, AssistantResponse } from "./types"

export default function Assistant({ config }) {
  useEffect(() => {
    if (config.assistantIsAuthorized === null) {
      (async () => config.setAssistantIsAuthorized(await isAuthorized()))()
    }
    if (config.assistantIsAuthorized && config.assistantRequest && config.assistantRequest.type !== "") {
      (async () => config.setAssistantResponse(await getSuggestion(config)))()
    }
  }, [config.assistantRequest])

  if (config.assistantIsAuthorized) {
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
            dangerouslySetInnerHTML={{ __html: config.assistantResponse.message }}
          >
          </div>
        </> :
        ""
      }
    </section>
  } else {
    return <></>
  }
}

async function isAuthorized(): Promise<boolean> {
  const rsp = await fetch('/api/assistant/authorized')
  return rsp.ok
}

export async function getSuggestion(config: ConfigState): Promise<AssistantResponse> {
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
    return {
      status: rsp.status, message: `ASSISTANT ERROR ${rsp.status}`
    }
  }

  const json = await rsp.json()

  return { status: rsp.status, message: json.suggestion }
}

