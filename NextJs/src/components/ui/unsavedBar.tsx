import { LoadingButton } from "@/features/form/SubmitButton";
import { AnimatePresence, motion } from "framer-motion";
import { CmdOrOption, KeyboardShortcut } from "./keyboard-shortcut";
import { Typography } from "./typography";

type UnsavedBarProps = {
  isShow: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
};

export const UnsavedBar = ({
  isShow,
  isLoading,
  onSubmit,
  onCancel,
}: UnsavedBarProps) => {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 flex items-center justify-center overflow-hidden py-4"
      style={{
        zIndex: 999,
      }}
    >
      <AnimatePresence>
        {isShow ? (
          <motion.div
            key="save-bar"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: [1, 1, 0],
              y: [0, -10, 20],
              transition: {
                duration: 0.5,
              },
            }}
            className="pointer-events-auto flex items-center gap-4 rounded-md border bg-card p-1 lg:p-2"
          >
            <Typography variant="small">Changes have been made.</Typography>
            {onCancel && (
              <LoadingButton
                size="sm"
                loading={isLoading}
                variant="destructive"
                onClick={onCancel}
              >
                reset{" "}
                <KeyboardShortcut eventKey="cmd" className="mr-1">
                  <CmdOrOption />
                </KeyboardShortcut>
                <KeyboardShortcut eventKey="q">Q</KeyboardShortcut>
              </LoadingButton>
            )}
            <LoadingButton
              size="sm"
              loading={isLoading}
              variant="outline"
              onClick={onSubmit}
            >
              Save{" "}
              <KeyboardShortcut eventKey="cmd" className="mr-1">
                <CmdOrOption />
              </KeyboardShortcut>
              <KeyboardShortcut eventKey="s">S</KeyboardShortcut>
            </LoadingButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
