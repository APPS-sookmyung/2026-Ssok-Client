"use client";

import { useState } from "react";
import { SpaceItem, WorkspaceType } from "@/types/workspace";
import { MOCK_SPACE_RESPONSE } from "@/constants/mockSpaces";
import IconCircle from "@/components/common/IconCircle";
import SpaceButton from "@/components/common/SpaceButton";
import SpaceInput from "@/components/common/SpaceInput";

import PlusIcon from "@/assets/icons/common/plus.svg";
import ArrowDownIcon from "@/assets/icons/arrow/arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/arrow/arrow-up.svg";

interface WorkspaceSectionProps {
  title: string;
  type: WorkspaceType;
  items: SpaceItem[];
  selectedId: number | null;
  onSelect: (spaceId: number) => void;
  onAdd: (name: string, type: WorkspaceType) => void;
}

function WorkspaceSection({
  title,
  type,
  items,
  selectedId,
  onSelect,
  onAdd,
}: WorkspaceSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const spaceVariant = type === "PERSONAL" ? "User" : "Team";

  return (
    <div className="flex flex-col gap-1">
      {/* 1. 헤더 (토글 + 추가) */}
      <div className="flex items-center justify-between px-2 py-1.5 text-body-sm font-semibold text-gray-500">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 hover:text-gray-900 transition-colors"
        >
          <img
            src={
              isOpen
                ? ArrowUpIcon.src || ArrowUpIcon
                : ArrowDownIcon.src || ArrowDownIcon
            }
            alt={isOpen ? "접기" : "펼치기"}
            className="h-4 w-4 object-contain"
          />
          <span className="text-body-sm font-semibold tracking-tight">
            {title}
          </span>
        </button>

        <IconCircle
          size="sm"
          onClick={() => {
            setIsOpen(true);
            setIsCreating(true);
          }}
          altText="스페이스 추가"
          icon={
            <img
              src={PlusIcon.src || PlusIcon}
              alt="추가"
              className="h-3.5 w-3.5 object-contain"
            />
          }
        />
      </div>

      {/* 2. 스페이스 목록 및 생성 인풋 */}
      {isOpen && (
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.spaceId}>
              <SpaceButton
                variant={spaceVariant}
                spaceName={item.name}
                isSelected={!isCreating && selectedId === item.spaceId}
                onClick={() => {
                  setIsCreating(false);
                  onSelect(item.spaceId);
                }}
              />
            </li>
          ))}

          {isCreating && (
            <li>
              <SpaceInput
                variant={spaceVariant}
                onSubmit={(name) => {
                  onAdd(name, type);
                  setIsCreating(false);
                }}
                onCancel={() => setIsCreating(false)}
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [spaces, setSpaces] = useState<SpaceItem[]>(MOCK_SPACE_RESPONSE.data);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(1);

  const personalSpaces = spaces.filter((s) => s.type === "PERSONAL");
  const teamSpaces = spaces.filter((s) => s.type === "TEAM");

  const handleAddSpace = (name: string, type: WorkspaceType) => {
    const newSpace: SpaceItem = {
      spaceId: Date.now(),
      name,
      type,
      bookmarkCount: 0,
    };
    setSpaces((prev) => [...prev, newSpace]);
    setSelectedSpaceId(newSpace.spaceId);
  };

  return (
    <aside className="flex h-full w-78 flex-col gap-2.5 border-r border-gray-300 bg-white px-8 pt-8 select-none">
      <WorkspaceSection
        title="개인 워크 스페이스"
        type="PERSONAL"
        items={personalSpaces}
        selectedId={selectedSpaceId}
        onSelect={setSelectedSpaceId}
        onAdd={handleAddSpace}
      />
      <WorkspaceSection
        title="팀 워크 스페이스"
        type="TEAM"
        items={teamSpaces}
        selectedId={selectedSpaceId}
        onSelect={setSelectedSpaceId}
        onAdd={handleAddSpace}
      />
    </aside>
  );
}
