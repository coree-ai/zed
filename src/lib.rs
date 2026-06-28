use zed_extension_api::{self as zed, Command, ContextServerId, Project, Result};

struct CoreeExtension;

impl zed::Extension for CoreeExtension {
    fn new() -> Self {
        CoreeExtension
    }

    fn context_server_command(
        &mut self,
        _server_id: &ContextServerId,
        _project: &Project,
    ) -> Result<Command> {
        let npx = if cfg!(windows) { "npx.cmd" } else { "npx" };
        Ok(Command {
            command: npx.to_string(),
            args: vec![
                "--yes".to_string(),
                "@coree-ai/coree@0.16.0".to_string(),
                "serve".to_string(),
            ],
            env: vec![],
        })
    }
}

zed::register_extension!(CoreeExtension);
